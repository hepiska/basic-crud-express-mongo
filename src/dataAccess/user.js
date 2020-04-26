import { mongo } from "models"

const userDA = {
  create: data => {
    return mongo.user.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.user.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.user.deleteById(_id)
  },
  findOneByEmail: email => {
    const condition = { email }


    return mongo.user.findOne(condition).then(res => res ? res.toObject() : null)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.user.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.user.find(query, fields).countDocuments()
    const users = await mongo.user.find(query, fields, { skip, limit, sort })

    return {
      total,
      users
    }
  },
  findOne: async query => {
    const city = await mongo.user.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default userDA
