/* eslint-disable func-style */
/* eslint-disable no-invalid-this */
import mongoose from "mongoose"
import fs from "fs"
import mongoose_delete from "mongoose-delete"

// eslint-disable-next-line
function toJsonPlugins(schema, options) {
  // eslint-disable-next-line
  schema.methods.toJson = function () {
    return JSON.parse(JSON.stringify(this))
  }
  // eslint-disable-next-line
  schema.statics.toJson = function (input) {
    return JSON.parse(JSON.stringify(input))
  }
}

const imageServicesUri = process.env.IMAGE_SERVICE_URI

function imageUriPlugin(schema, options) {
  // eslint-disable-next-line

    // eslint-disable-next-line
  schema.pre('save',function(next) {
    if (this.images) {

      this.images = this.images.map(im => im.replace(imageServicesUri, ""))
    }
    if (this.image) {

      this.image = this.image.replace(imageServicesUri, "")
    }
    next()
  })

  // schema.post('findOne', function(doc){
  //   console.log(doc)
  //     // if(doc.image){
  //     //   doc.image = doc.image.replace(imageServicesUri,'')
  //     //   doc.image = imageServicesUri + doc.image
  //     // }
  // })

  schema.post(["find", "findOne"], docs => {
    if (Array.isArray(docs)) {
      docs = docs.map(doc => {
        if (doc.images) {
          doc.images = doc.images.map(image => {

            image = image.replace(imageServicesUri, "")
            image = imageServicesUri + image

            return image
          })
        }

        return doc
      })
    } else if (docs && docs.image) {
      docs.image = docs.image.replace(imageServicesUri, "")
      docs.image = imageServicesUri + docs.image
    }

  })

  // eslint-disable-next-line
  schema.statics.toJson = function (input) {
    return JSON.parse(JSON.stringify(input))
  }
}

const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI


const dbConfig = {
  uri: uri,
  options: {
    keepAlive: 1,
    autoIndex: false,
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}

const db = {
  mongo: {},
  mongoose
}

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true)
}

mongoose.plugin(toJsonPlugins)
mongoose.plugin(imageUriPlugin)
mongoose.plugin(mongoose_delete, { overrideMethods: "all" })
mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

fs.readdirSync(`${__dirname}/`)
  .filter(file => file.indexOf(".js") >= 0 && file !== "index.js")
  .forEach(model => {
    const modelName = model.replace(".js", "").replace("-", "")
    const currentModel = require(`${__dirname}/${model}`)

    if (currentModel.default.base instanceof mongoose.Mongoose) {
      // do mongo/mongoose
      db.mongo[modelName] = currentModel.default
    }
  })

export const { mongo } = db

/**
 * connect th db function
 * @return  {void}
 **/
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(dbConfig.uri, dbConfig.options)

    return connection
  } catch (error) {
    throw error
  }

}

export default db
