pipeline {
    parameters {
        choice(name: 'PLATFORM_FILTER', choices: ['all', 'linux', 'windows', 'mac'], description: 'Run on specific platform')
        string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Should you choose to accept')
        text(name: 'TEXT_PARAMETER', defaultValue: '', description: 'Enter something valuable')
        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')
    }

    // tools {
    //     nodejs('node:23.7.0')
    // }
    agent {
        docker {
            image 'node:latest'
            args '--shm-size=2gb'
            reuseNode true
        }
    }
    environment {
        NPM_CONFIG_CACHE = '${WORKSPACE}/.npm'
    }



    stages { 
        stage('Install chrome') {
            sh '''
                apt-get update
                apt-get install -y wget gnupg ca-certificates

                wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
                echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
                apt-get update
                apt-get install -y google-chrome-stable

                google-chrome --version
            '''
        }
        stage('Install dependencies') {
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Check code style') {
            steps {
                echo 'npm run lint:fix'
                // sh 'npm run lint:fix'
            }
        }

        stage('Run api tests') {
            steps {
                sh '''
                    npm run test:single
                '''
            }
        }
    }
}
// pipeline { 
//     agent any
//     environment {
//         ENV_STAGE = 'DEV'
//         APP_NAME = 'MyApp'
//     }

//     stages {
//         stage('w/o docker') {
//             steps {
//                 sh '''
//                 echo "Without docker"
//                 ls -la
//                 touch container-no.txt
//                 ls -la
//                 '''
//             }
//         }
        
//     stage('w docker') {
//         agent {
//             docker {
//                 image 'node:18-alpine'
//                 reuseNode true
//             }
//         }
//             steps {
//                 sh '''
//                 echo "With docker"
//                 npm --version
//                 ls -la
//                 touch container-docker.txt
//                 ls -la
//                 '''
//             }
//         }
        
//      stage('env variable') {
//             steps {
//                 sh '''
//                 echo "app name variable ${APP_NAME}"
//                 echo "env stage variable ${ENV_STAGE}"
//                 '''
//             }
//         }
//     }
    
//     post {
//         always {
//             echo 'This always runs (success, failure, or aborted)'
//         }
//         success {
//             echo 'Pipeline succeeded!'
//         }
//         failure {
//             echo 'Pipeline failed.'
//         }
//         aborted {
//             echo 'Pipeline was aborted.'
//         }
//         cleanup {
//             echo 'Cleanup actions (e.g., remove temp files)'
//         }
//     }    
// }
