#!/usr/bin/env tsx
/**
 * Script to clear all data from MongoDB meritai database
 * Run with: tsx clear-database.ts
 */

import connectDB from './src/lib/db'
import CandidateModel from './src/models/Candidate'
import JobModel from './src/models/Job'

async function clearDatabase() {
  console.log('🧹 Clearing MongoDB database...\n')

  try {
    await connectDB()

    // Delete all candidates
    console.log('Deleting all candidates...')
    const candidatesResult = await CandidateModel.deleteMany({})
    console.log(`✅ Deleted ${candidatesResult.deletedCount} candidate(s)\n`)

    // Delete all jobs
    console.log('Deleting all jobs...')
    const jobsResult = await JobModel.deleteMany({})
    console.log(`✅ Deleted ${jobsResult.deletedCount} job(s)\n`)

    console.log('🎉 Database cleared successfully!')
    console.log(`   - Candidates: ${candidatesResult.deletedCount}`)
    console.log(`   - Jobs: ${jobsResult.deletedCount}\n`)
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    process.exit(1)
  } finally {
    // Close connection
    const mongoose = await import('mongoose')
    await mongoose.default.connection.close()
    console.log('👋 Database connection closed')
  }
}

// Run the cleanup
clearDatabase().catch(console.error)
