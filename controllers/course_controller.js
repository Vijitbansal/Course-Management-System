const express = require("express")
const route = express.Router()
const Course = require("../models/course")

//create course 
module.exports.create = async  (req, res)=> {
    try {
        const is_valid_user =  req.user ;
        console.log(is_valid_user,"+++++++++++")
        // console.log(is_valid_user,"#####");
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can create course"
            })
        }
            const{name,description,capacity,start_date,end_date} = req.body;
            let newCourse = await Course.create({
                name ,
                description,
                capacity,
                start_date,
                end_date
            });
            return res.status(201).json({
                message:"Course created successfully"
            })
            
    } catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }

}

//update course 
module.exports.update = async function (req, res) {
    try {
        const is_valid_user =  req.user ;
        // console.log(is_valid_user,"#####");
        if(is_valid_user.type!="EDUCATOR")
        {
            return res.status(403).json({
                message:"Only educators can update course"
            })
        }
            const{id} = req.params;
            let oldCourse = await Course.findById(id);
            console.log(oldCourse,"llllllllllllllll")
            if(oldCourse){
                if(req.body.capacity){
                    oldCourse.capacity=req.body.capacity
                }
                console.log(oldCourse,"Oooooooooooooo")
                oldCourse.save() // Description/name, start_date, end_date

                return res.status(201).json({
                    message:"Course updated successfully"
                })
            }
                return res.status(400).json({
                    message:"Course not found"
            
                })}
        catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }
}

module.exports.view_students = async (req,res)=>{
    try{
        let course  = await Course.findById(req.params.id)
        .populate('students_enrolled')
        if(course){
            return res.status(200).json({
                message : "List of students enrolled in the respective course",
                data : course.students_enrolled
            })}
        return res.status(404).json({
            message : "Course not found"
        })
    }
    catch (err) {
        console.log(err,"errrrrrr");
        return res.status(500).json({
            message:"Some error occured"
        })
    }
}













//delete courses
// route.delete("/:code", tf.verifyToken, (req, res) => {

//     jwt.verify(req.token, config.secret, (err, authData) => {
//         if (err) {
//             res.status(403).json({ status: "forbidden" })
//         } else {
//             try {
//                 const query = { ccode: req.params.code }
//                 Courses.deleteOne(query, (err) => {
//                     if (err) {
//                         console.log(err)
//                         res.status(500).json({ error: err });
//                     } else {
//                         res.status(200).json({ status: true })
//                     }
//                 })
//             } catch (ex) {
//                 res.status(500).send("Server Error" + ex)
//             }
//         }
//     })

// })


//courses search from course code and name
//eg :- localhost:4000/courses/application framework
//or
//eg :- localhost:4000/courses/se3010
//or
//eg :- localhost:4000/courses/app
//kiyala gahuwoth app kalla name eke thiyena okkoma course enawa
//case insensitive

//get course by code
// route.get("/course/:code", (req, res) => {

//     try {
//         const query = { ccode: req.params.code }
//         Courses.find(query, (err, course) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ courses: course })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })

// //get all courses
// route.post("/course", async (req, res) => {

//     try {
//         const query = {}
//         Courses.find(query, (err, course) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ courses: course })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })


// //get courses belong to a paricular degress,year and semester
// //eg :- localhost:4000/courses?dcode=SE&year=3rd&sem=1st
// route.get("/", tf.verifyToken, (req, res) => {

//     jwt.verify(req.token, config.secret, (err, authData) => {
//         if (err) {
//             res.status(403).json({ status: "forbidden" })
//         } else {
//             try {
//                 const query = { dcode: req.query.dcode, year: req.query.year, semester: req.query.sem }
//                 Courses.find(query, (err, course) => {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).json({ error: err });
//                     } else {
//                         res.status(200).json({ courses: course })
//                     }
//                 });
//             } catch (ex) {
//                 res.status(500).send("Server Error" + ex)
//             }
//         }
//     })

// })

// //update course materials 
// route.post("/:id/materials", async (req, res) => {


//     try {

//         await req.body.data.map(elem => {
//             const query = { ccode: req.params.id }
//             Courses.updateOne(query, { $push: { cmaterials: elem } }, (err) => {
//                 if (err) {
//                     console.log(err)
//                     res.status(500).json({ error: err });
//                 }
//             })
//         })

//         res.status(200).json({ success: true })

//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }


// })

// //get course materials
// route.get("/:id/materials", (req, res) => {

//     try {
//         const query = { ccode: req.params.id }
//         Courses.find(query, (err, course) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ materials: course[0].cmaterials })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })

// //delete course material
// route.delete("/:id/materials/:name", (req, res) => {

//     try {
//         const query = { ccode: req.params.id }
//         Courses.updateOne(query, { $pull: { cmaterials: { fileName: req.params.name } } }, (err) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ status: true })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })

// //update course assignments 
// route.post("/:id/assignments", (req, res) => {

//     try {
//         const query = { ccode: req.params.id }
//         Courses.updateOne(query, { $push: { assignments: req.body } }, (err) => {
//             if (err) {
//                 console.log(err)
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ success: true })
//             }
//         })

//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })


// //get course assignments
// route.get("/:id/assignments", (req, res) => {

//     try {
//         const query = { ccode: req.params.id }
//         Courses.find(query, (err, course) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ assignments: course[0].assignments })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })

// //update course assignment
// route.put("/:id/assignments/:aid", (req, res) => {


//     try {
//         const query = { ccode: req.params.id, "assignments._id": req.params.aid }
//         Courses.updateOne(query, { $set: { "assignments.$.dueDate": req.body.dueDate } }, (err) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//             } else {
//                 res.status(200).json({ status: true })
//             }
//         });
//     } catch (ex) {
//         res.status(500).send("Server Error" + ex)
//     }

// })




// module.exports = route
