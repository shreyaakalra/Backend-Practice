const args = process.argv.slice(2);
const username = args[0];

if(!username){
    console.log("add a username");
    process.exit(1);
}

fetchInfo(username); 

