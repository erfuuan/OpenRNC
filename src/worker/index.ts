//get data from db and produce to destinatin

import Service from "../service/index";

async function worker() {
  setInterval(async () => {
    console.log("start read data");
    const pipeline = await Service.CRUD.findOneRecord("Pipeline", {}, "");

    console.log(pipeline);
  },2000);
}

export default worker;
