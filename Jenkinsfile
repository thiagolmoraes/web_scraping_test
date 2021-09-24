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
         sh "docker-compose down"
         sh "docker-compose up -d"
      }
    }
    stage('Test'){
      steps{
        echo 'Testing...'
        snykSecurity(
          snykInstallation: '/usr/bin/snyk',
          snykTokenId: '',
          // place other parameters here
        )
      }
    }
  }
}
