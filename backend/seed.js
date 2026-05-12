const mongoose = require("mongoose");
const User = require("./models/User");
const Project = require("./models/Project");
const Application = require("./models/Application");

mongoose.connect("mongodb://127.0.0.1:27017/recruitment");

async function seedData() {

  try {

    // create dummy user
    const user = await User.create({
      name: "Rahul Kumar",
      email: "rahul@test.com",
      password: "123456",
      role: "user"
    });

    // create dummy project
    const project = await Project.create({
      projectCode: "AI001",
      projectTitle: "AI Research Project",
      deadline: new Date("2026-12-30"),
      requiredDocuments: ["photo","10th_certificate"]
    });

    // create dummy applications
    const applications = [];

    for (let i = 1; i <= 5; i++) {

      applications.push({
        user: user._id,
        project: project._id,
        applicantName: `Applicant ${i}`,
        formData: {
          full_name: `Applicant ${i}`,
          email: `applicant${i}@test.com`
        },
        documents: {
          photo: `uploads/AI001/Applicant_${i}/Applicant_${i}_photo.jpg`
        }
      });

    }

    await Application.insertMany(applications);

    console.log("Dummy applications inserted");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit();

  }

}

seedData();