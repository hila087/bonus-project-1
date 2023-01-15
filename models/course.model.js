const { Schema, model } = require("mongoose")

// courses schema
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pic_url: {    
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course_link: {
        type: String,
        required: true
    }
})

module.exports.Course = model('course', CourseSchema)