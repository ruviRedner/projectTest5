import gradsModel from "../models/gradsModel";

 export const getAvarage = async (Tid:string): Promise<Number> => {
    const grades = await gradsModel.find({ teacherId: Tid });
    if (!grades) {
        throw new Error("No grades found for this teacher");
    }
    const ave = await gradsModel.aggregate(
        [
            {
                $match: { teacherId: Tid }
            },
            {
                $group: {
                    _id: "$subject",
                    average: { $avg: "$average" }
                }
            }
        ]  
    )
    return ave[0].average
       
      

    
   
}