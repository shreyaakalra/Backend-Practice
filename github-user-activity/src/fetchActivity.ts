export const fetchActivity =  async(username: string) => {

    try{
        const response = await fetch(`https://api.github.com/users/${username}/events`);

        if(!response.ok){
            console.log("Something's wrong! Try Later.")
            throw new Error("Invalid Username")
        }

        const data = await response.json();

        data.forEach((item: any) => {
            const type = item.type;
            const repoName = item.repo.name;

            switch(type){
                case "PushEvent":
                    const commitCount = item.payload.commits?.length || 1;
                    console.log(`Pushed ${commitCount} commit to ${repoName}`);
                    break;

                case "PullRequestReviewEvent":
                    console.log(`Reviewed a pull request in ${repoName}`);
                    break;

                case "IssuesEvent":
                    console.log(`created an issue in ${repoName}`);
                    break;

                case "WatchEvent":
                    console.log(`Performed watch event in ${repoName}`);
                    break;

                case "CreateEvent":
                    console.log(`created a repo called ${repoName}`);
                    break;

                case "ForkEvent":
                    console.log(`Forked a repo called ${repoName}`);
                    break;

                default:
                    console.log("can't get data right now");
                    break;

            }
        })

    } catch (err){
        console.log(err);
    }
    

    
}