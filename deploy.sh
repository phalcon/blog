#!/bin/bash

# Pull from github
git pull

# Clear cache
rm -f var/cache/volt/*.php
rm -f var/cache/data/*.cache
