import Model from '../model/index';
// import moment from "jalali-moment";

export default {
  async create(schema: string, data: any) {
    try {
      const newData = new Model[schema](data);
      return await newData.save();
    } catch (err) {
      console.log('err from @create crudService zone');
      console.log(err);
      throw err;
    }
  },
  async findById(schema: string, dataId: any, populate?: any,select?:any) {
    try {
      const dataSchema = Model[schema];
      const data = await dataSchema.findById(dataId).populate(populate).select(select).lean();
      // const data = await dataSchema.findOne({ _id: dataId }).populate(populate).lean();
      // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
      // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
      return data;
    } catch (err) {
      console.log(err);
      console.log('err from @findById crudService zone');
      throw err;
      // return undefined;
    }
  },

  async findOneRecord(schema: string, condition: any, populate: any) {
    try {
      const dataSchema = Model[schema];
      const data = await dataSchema.findOne(condition).populate(populate).lean();
      // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
      // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
      return data;
    } catch (err) {
      console.log(err);
      console.log('err from @findOneRecord crudService zone 1');
      throw err;
    }
  },

  async getAll(schema: string, condition: any, populate: any, sort: any, select: any) {
    try {
      const dataSchema = Model[schema];
      const posts = await dataSchema.find(condition).populate(populate).sort(sort).select(select).lean();
      return posts;
    } catch (err) {
      console.log(err);
      console.log('err from @getAll crudService zone');
      throw err;
    }
  },

  async find(schema: string, condition: any, populate?: any, sort?: any, select?: any, limit?: number) {
    try {
      const dataSchema = Model[schema];
      const data = await dataSchema.find(condition).populate(populate).sort(sort).select(select).limit(limit).lean();
      // data.createdAt = moment(data.createdAt, "X").format(
      //   "jYYYY/jMM/jDD HH:mm"
      // );

      return data;
    } catch (err) {
      console.log(err);
      console.log('err from @find  crudService zone');
      throw err;
    }
  },

  async updateById(schema: string, data: any, dataId: any, populate: any, select: any) {
    try {
      const dataSchema = Model[schema];
      const updatedData = await dataSchema
        .findByIdAndUpdate(
          dataId,
          data,
          // { new: true }
          { returnOriginal: false }
        )
        .populate(populate)
        .select(select)
        .lean();
      // updatedData.updatedAt = moment(updatedData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
      // updatedData.createdAt = moment(updatedData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
      return updatedData;
    } catch (err) {
      console.log(err);
      console.log('err from @update crudService zone');
      throw err;
    }
  },

  async softDelete(schema: string, dataId: any, data: any) {
    try {
      const dataSchema = Model[schema];
      await dataSchema.findByIdAndUpdate(dataId, data);
      return true;
    } catch (err) {
      console.log(err);
      console.log('err from @delete crudService zone');
      throw err;
    }
  },

  async hardDelete(schema: string, dataId: any) {
    try {
      const dataSchema = Model[schema];
      await dataSchema.deleteOne({ _id: dataId });
      return true;
    } catch (err) {
      console.log(err);
      console.log('err from @delete crudService zone');
      throw err;
    }
  },

  async collectionCount(schema: string) {
    const dataSchema = Model[schema];
    const countQuery = dataSchema.where({}).countDocuments();
    return countQuery;
  },
};
