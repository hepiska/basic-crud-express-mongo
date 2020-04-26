/* eslint-disable func-style */
/* eslint-disable no-invalid-this */


export async function createSlug() {
  // eslint-disable-next-line no-invalid-this
  let totalData = null

  if (this.model.find) {
    const data = this.getUpdate ? this.getUpdate() : this


    totalData = await this.model.find({ name: data.name }).countDocuments()
    let slug = data.name.replace(" ", "_")

    if (totalData) {
      data.name.replace(" ", "_")
      slug = data.name.replace(" ", "_") + totalData
      const numberOnSameSlug = await this.model.find({ slug }).countDocuments()

      data.slug = slug + numberOnSameSlug


    }

    return this.setUpdate({ ...data })


  }

  totalData = await this.constructor.find({ name: this.name }).countDocuments()
  this.slug = this.name.replace(" ", "_")
  if (totalData) {
    // eslint-disable-next-line no-invalid-this
    this.slug = this.slug + totalData
    const numberOnSameSlug = await this.constructor.find({ slug: this.slug }).countDocuments()

    if (numberOnSameSlug) {
      this.slug = this.slug + numberOnSameSlug
    }

  }

  return this


}
