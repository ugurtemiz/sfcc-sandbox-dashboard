// Paste it to SQL Editor

// CREATE TABLE daily_usage (
//     id SERIAL PRIMARY KEY,
//     date DATE NOT NULL UNIQUE,
//     "createdSandboxes" INT NOT NULL,
//     "activeSandboxes" INT NOT NULL,
//     "deletedSandboxes" INT NOT NULL,
//     "sandboxSeconds" INT NOT NULL,
//     "minutesUpByProfile" JSON,
//     "minutesUp" INT NOT NULL,
//     "minutesDown" INT NOT NULL
//   );


// import { db } from '@/lib/db'

// export async function createTables() {
//   console.log('start')

//   const results = await db.execute(
//     'CREATE TABLE daily_usage (' +
//       'id INT AUTO_INCREMENT PRIMARY KEY,' +
//       'date DATE NOT NULL UNIQUE,' +
//       'createdSandboxes int NOT NULL,' +
//       'activeSandboxes int NOT NULL,' +
//       'deletedSandboxes int NOT NULL,' +
//       'sandboxSeconds int NOT NULL,' +
//       'minutesUpByProfile JSON,' +
//       'minutesUp int NOT NULL,' +
//       'minutesDown int NOT NULL' +
//       ');'
//   )

//   console.log(results)
// }

// createTables()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     console.log('end')
//   })
