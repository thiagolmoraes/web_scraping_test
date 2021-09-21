#!/bin/bash

docker stop web_scraping > /dev/null 2>&1
docker rm web_scraping > /dev/null 2>&1
docker rmi web_scraping > /dev/null 2>&1
