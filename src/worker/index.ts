import Service from "../service/index";
import redis from "./redis";

async function worker() {
  setTimeout(() => {
    setInterval(async () => {
      console.log("start read data at : ", new Date());
      const consumeData = await Service.CRUD.findOneRecord(
        "Consume",
        { status: "todo" },
        []
      );
      if (consumeData) {
        let pipeLienData = await Service.CRUD.findById(
          "Pipeline",
          consumeData.pipelineId.toString(),
          []
        );
        if (pipeLienData) {
          let pipelineArr = pipeLienData.destinationIds;
          pipelineArr?.forEach(async (el) => {
            let destinatinDetails: any = await Service.CRUD.findById(
              "Destination",
              el,
              []
            );
            if (destinatinDetails.platform === "redis") {
              await redis(
                destinatinDetails.credential,
                "data",
                consumeData.data
              );
            }
            await Service.CRUD.updateById(
              "Consume",
              { status: "done" },
              consumeData._id,
              [],
              ""
            );
          });
        }
      }
    }, 5000);
  }, 1000);
}

export default worker;
