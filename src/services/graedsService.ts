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
export const getStudentGradeByStudent = async (Sid:string) => {
    const grades = await gradsModel.find({ studentId: Sid });
    if (!grades) {
        throw new Error("No grades found for this student");
    }
    return grades;

}
export const getStudentGradeByIsTeacher = async (Tid:string) => {
    const grades = await gradsModel.find({ studentId: Tid });
    if (!grades) {
        throw new Error("No grades found for this student");
    }
    return grades;

}