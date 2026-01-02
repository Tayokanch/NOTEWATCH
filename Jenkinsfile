pipeline {

    agent any
    environment {
        DB_USER     = credentials('DB_USER')
        DB_PASSWORD = credentials('DB_PASSWORD')
        DB_NAME     = credentials('DB_NAME')
        DB_PORT    = credentials('DB_PORT')
        JWT_SECRET = credentials('JWT_SECRET')
        INIT_ADMIN_EMAIL     = credentials('INIT_ADMIN_EMAIL')
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
