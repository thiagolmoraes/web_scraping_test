pipeline {
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git url: 'https://github.com/thiagolmoraes/web_scraping_test.git'
        checkout scm
        sh 'ls -lat'
      }
    }
    stage('Build') {
      steps{
         sh "/usr/bin/docker-compose down"
         sh "/usr/bin/docker-compose up -d"
      }
    }
    stage('Test'){
      steps{
        echo 'Testing...'
        snykSecurity(
          snykInstallation: '/usr/bin/snyk',
          snykTokenId: 'https://github.com/thiagolmoraes/web_scraping_test.git',
          // place other parameters here
        )
      }
    }
  }
}
