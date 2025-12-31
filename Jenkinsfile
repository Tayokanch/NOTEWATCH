pipeline {
    agent {
        docker { image 'docker:20.10-dind' }
    }
    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }
    }
}
