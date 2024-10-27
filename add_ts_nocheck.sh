#!/bin/bash

# Function to add //@ts-nocheck to the beginning of a file
add_ts_nocheck() {
    local file="$1"
    echo "// @ts-nocheck" > "$file.tmp"
    cat "$file" >> "$file.tmp"
    mv "$file.tmp" "$file"
}

# Find all .js files and apply the function in .sh file

find . -name "\*.js" -exec bash -c 'add_ts_nocheck "{}"' \;