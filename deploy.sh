#!/bin/bash

# Current folder
BUILD_PATH="${PWD##*/}"

# Pull from github
git pull

# Clear cache
rm -f var/cache/volt/*.php
rm -f var/cache/cache/*.php
