import sys
import json

def main():
    if len(sys.argv) < 2:
        print("No JSON string provided.")
        sys.exit(1)
    
    json_str = sys.argv[1]

    try:
        # Ensure the JSON string uses double quotes for keys and values
        # If the JSON string from Node.js uses single quotes, replace them
        json_str = json_str.replace("'", '"')
        
        data = json.loads(json_str)
        print("Received JSON as Python dictionary:")
        print(data)
        
        # Example: Accessing specific items
        for article, color in data.items():
            print(f"{article}: {color}")
        
        # You can add more processing logic here
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()