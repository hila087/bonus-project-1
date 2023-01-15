
// -- connect to mongodb database w/ defaule configurations
require("mongoose")
    .set('strictQuery', false)
    .connect(process.env['DATABASE_URL'])