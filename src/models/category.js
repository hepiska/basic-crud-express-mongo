/* eslint-disable no-invalid-this */

import { Schema, model } from "mongoose"
import { createSlug } from "libs/moggoseMiddleware"


const $ = {
  name: "Category",
}

$.schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true,
  },
  desc: String,
  images: [String],
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })


$.schema.pre(["validate", "findOneAndUpdate"], createSlug)
const $model = model($.name, $.schema)

$model.createIndexes()

export default $model
