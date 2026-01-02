pipeline {
    agent any

    environment {
        DB_USER           = credentials('DB_USER')
        DB_PASSWORD       = credentials('DB_PASSWORD')
        DB_NAME           = credentials('DB_NAME')
        DB_PORT           = credentials('DB_PORT')
        JWT_SECRET        = credentials('JWT_SECRET')
        INIT_ADMIN_EMAIL  = credentials('INIT_ADMIN_EMAIL')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare .env') {
            steps {
                sh '''
                cat > .env <<EOF
                    DB_USER=${DB_USER}
                    DB_PASSWORD=${DB_PASSWORD}
                    DB_NAME=${DB_NAME}
                    DB_PORT=${DB_PORT}
                    JWT_SECRET=${JWT_SECRET}
                    INIT_ADMIN_EMAIL=${INIT_ADMIN_EMAIL}
                    EOF
                '''
            }
        }

        stage('Build All Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Services') {
            when { branch 'main' }
            steps {
                sh '''
                docker compose down
                docker compose up -d
                docker compose ps
                '''
            }
        }

        stage('Cleanup .env') {
            steps {
                sh 'rm -f .env'
            }
        }
    }
}
