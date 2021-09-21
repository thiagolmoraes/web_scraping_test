pipeline {
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        //git url: 'https://github.com/thiagolmoraes/web_scraping_test.git'
        checkout scm
        sh 'ls -lat'
      }
    }
    stage('Before Build') {
      steps {
        //sh 'bash before_deploy.sh'
        echo 'Before Build'
      }
    }
    stage('Build') {
      steps{
        step(
          [
            $class: 'DockerComposeBuilder', 
            dockerComposeFile: 'docker-compose.yml', 
            option: [
              $class: 'StartAllServices'
              ], 
            useCustomDockerComposeFile: true
            ]
          )
      }
    }
  }
}
