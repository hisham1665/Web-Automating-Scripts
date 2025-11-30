import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get MongoDB URI from .env
MONGO_URI = os.getenv('MONGO_URI')

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Get the default database from the URI
db = client.get_default_database()
collection = db['participants']

# Read the CSV file
csv_file = 'extracted_contacts.csv'
df = pd.read_csv(csv_file)

# Convert DataFrame to list of dictionaries
records = df.to_dict('records')

# Clean up the records (remove NaN values)
cleaned_records = []
for record in records:
    cleaned_record = {k: v for k, v in record.items() if pd.notna(v)}
    cleaned_records.append(cleaned_record)

# Insert into MongoDB with duplicate handling
if cleaned_records:
    inserted_count = 0
    duplicate_count = 0
    error_count = 0
    
    for record in cleaned_records:
        try:
            collection.insert_one(record)
            inserted_count += 1
        except Exception as e:
            if 'duplicate key error' in str(e):
                duplicate_count += 1
                print(f"Skipping duplicate email: {record.get('Email Address', 'N/A')}")
            else:
                error_count += 1
                print(f"Error inserting record: {e}")
    
    print(f"\n=== Summary ===")
    print(f"Successfully inserted: {inserted_count} records")
    print(f"Duplicates skipped: {duplicate_count} records")
    print(f"Errors: {error_count} records")
    print(f"Database: {db.name}")
    print(f"Collection: {collection.name}")
else:
    print("No records to insert")

# Close connection
client.close()
