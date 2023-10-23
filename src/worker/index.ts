//get data from db and produce to destinatin

import Service from "../service/index";

async function worker() {
  setInterval(async () => {
    console.log("start read data at : ",new Date());
    const pipeline = await Service.CRUD.findOneRecord("Pipeline", {status:'todo'}, "");
    console.log(pipeline);
  },5000);
}

export default worker;
