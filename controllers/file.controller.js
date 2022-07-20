const uploadFile = require("../middleware/upload");
const Submission = require("../models/submission");
// const fs = require('fs') 
const User = require("../models/user");


const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if(res.status(200)){
      let submission_time = new Date();
      const {assignment_id,student_id} = req.body
      let file_url = req.file.originalname;
      let newSubmission = await Submission.create({
         file_url,
         submission_time,
         student_id,
         assignment_id
    });
    }
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

//view all submissions against an assignment
const getListFiles = async (req, res) => {
  try{
    const {assignment_id} = req.body
    let submissions = await Submission.find({ assignmentId: assignment_id });
    console.log(submissions,"submissionssssss");
    if(submissions){
      let fileInfos = [];
      submissions.forEach((file) => {
        fileInfos.push({
          name: file.file_url,
        });
      });
      return res.status(200).json({
        Files: fileInfos
      });
    }
    return res.status(200).json({
      message : "No submissions in this assignment" 
    });
  }
  catch (err) {
    console.log("Error while showing submissions ", err);
    return;
  }
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const update_grade = async (req, res) => {
  console.log("Arrivedddd");
  try{
    const is_valid_user = req.user;
    if (is_valid_user.type != "EDUCATOR") {
      return res.status(403).json({
        message: "Only educators can create course",
      });
    }
    // educator -> submissions -> update_grade
    const { submission_id, grade } = req.body
    console.log(req.body,"bodyy")
    let submission = await Submission.findById(submission_id);
    console.log(submission,"submissionssssss");
    if(submission){
      submission.grade = grade;
      submission.save();
      return res.status(200).json({
        message : "Submissions grade saved" 
      });
    }
    return res.status(200).json({
      message : "No submissions in this assignment" 
    });
  }
  catch (err) {
    console.log("Error while updating grades ", err);
    return;
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  update_grade
};