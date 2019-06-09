import * as functions from 'firebase-functions';
import * as telegraf from 'telegraf'


export const notify = functions.https.onRequest((request, response) => {
    const index = (request.body.ref as string).lastIndexOf('/')
    const branch = (request.body.ref as string).substring(index + 1)

    const name = request.body.head_commit.committer.name
    const email = request.body.head_commit.committer.email

    let msgCommits = ''
    const commits = (request.body.commits as Array<any>)
    commits.forEach((commit: any, commitIndex: any, array: any) => {
        console.log(commit.message)
        msgCommits = `${msgCommits}\n📋${commit.message}`
        // msgCommits.concat(commitIndex)
     })
    
    
    const bot = new telegraf.Telegram('774481227:AAFz6YCHq2_91DOYpQ7gQZoY13Ja0mjwk4U')
    return bot.sendMessage('-359171100', `👨${name} ${email}👨\nсделал пуш в 🌵${branch}🌵\n${msgCommits}`)
});
