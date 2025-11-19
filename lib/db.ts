
import { ObjectId } from "mongodb"
import { getCollection } from "./mongodb"

export async function addRecord(collection: string, record: any) {
  try {
    const col = await getCollection(collection)

    // Generate a new consistent ID
    const newId = new ObjectId()

    const newRecord = {
      _id: newId,               // real ObjectId for Mongo
      id: newId.toString(),     // string version for frontend
      ...record,
      createdAt: new Date().toISOString(),
    }

    const result = await col.insertOne(newRecord)
    console.log(`✅ Record added to ${collection}:`, result.insertedId)

    return newRecord
  } catch (error) {
    console.error(`❌ Error adding record to ${collection}:`, error)
    throw error
  }
}


export async function getRecords(collection: string, filter: any = {}) {
  try {
    const col = await getCollection(collection)
    const records = await col.find(filter).toArray()
    return records
  } catch (error) {
    console.error(`Error fetching records from ${collection}:`, error)
    throw error
  }
}

export async function getRecordById(collection: string, id: string) {
  try {
    const col = await getCollection(collection)
    let query: any = { id }
    try {
      query = { $or: [{ _id: new ObjectId(id) }, { id }] }
    } catch {
      query = { id }
    }
    const record = await col.findOne(query)
    return record
  } catch (error) {
    console.error(`Error fetching record from ${collection}:`, error)
    throw error
  }
}

export async function updateRecord(collection: string, id: string, updates: any) {
  try {
    const col = await getCollection(collection)

    // ✅ Step 1: Build safe query
    const query: Record<string, any> = {
      $or: [{ _id: id }, { id }]
    }

    if (ObjectId.isValid(id)) {
      try {
        query.$or.unshift({ _id: new ObjectId(id) })
      } catch {
        console.warn("⚠️ Could not convert ID to ObjectId:", id)
      }
    }

    // ✅ Step 2: Strip immutable fields
    const { _id, id: internalId, createdAt, ...safeUpdates } = updates || {}

    // ✅ Step 3: Add updated timestamp
    const updatePayload = {
      ...safeUpdates,
      updatedAt: new Date().toISOString(),
    }

    console.log(`🛠️ Updating record in "${collection}" for ID: ${id}`)
    console.log("➡️ Payload:", JSON.stringify(updatePayload, null, 2))
    console.log("🔎 Query:", JSON.stringify(query, null, 2))

    // ✅ Step 4: Perform the update
    const updateResult = await col.updateOne(query, { $set: updatePayload })

    if (updateResult.matchedCount === 0) {
      console.warn(`⚠️ No document matched for ID: ${id}`)
      return null
    }

    console.log(`✅ Updated ${updateResult.modifiedCount} document(s)`)

    // ✅ Step 5: Fetch and return the updated document
    const updatedDoc = await col.findOne(query)

    if (!updatedDoc) {
      console.warn(`⚠️ Could not fetch updated document for ID: ${id}`)
      return null
    }

    console.log(`✅ Successfully fetched updated document for ${collection}:`, updatedDoc._id)
    return updatedDoc
  } catch (error: any) {
    console.error(`❌ Error updating record in ${collection}:`, error.message)
    throw error
  }
}

export async function deleteRecord(collection: string, id: string) {
  try {
    const col = await getCollection(collection)
    let query: any = { id }
    try {
      query = { $or: [{ _id: new ObjectId(id) }, { id }] }
    } catch {
      query = { id }
    }
    const result = await col.deleteOne(query)
    console.log(`Record deleted from ${collection}:`, id)
    return result.deletedCount > 0
  } catch (error) {
    console.error(`Error deleting record from ${collection}:`, error)
    throw error
  }
}

export async function readData(collection: string) {
  return await getRecords(collection)
}

export async function writeData(collection: string, data: any[]) {
  try {
    const col = await getCollection(collection)
    await col.deleteMany({})
    if (data.length > 0) {
      await col.insertMany(data)
    }
  } catch (error) {
    console.error(`Error writing data to ${collection}:`, error)
    throw error
  }
}

export async function getStats() {
  try {
    const donations = await getRecords("donations")
    const volunteers = await getRecords("volunteers")
    const sponsorships = await getRecords("sponsorships")
    const boys = await getRecords("boys")

    const donationsByProgram = {
      skills: donations
        .filter((d: any) => d.program === "skills")
        .reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
      education: donations
        .filter((d: any) => d.program === "education")
        .reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
      sports: donations
        .filter((d: any) => d.program === "sports")
        .reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
    }

    return {
      totalDonations: donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
      donationCount: donations.length,
      totalVolunteers: volunteers.length,
      totalSponsors: sponsorships.length,
      totalBoys: boys.length,
      donationsByProgram,
    }
  } catch (error) {
    console.error("Error calculating stats:", error)
    throw error
  }
}
