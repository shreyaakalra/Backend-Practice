const args = process.argv.slice(2);

const durationIndex = args.indexOf('--duration');

const duration: string = (durationIndex !== -1 ? args[durationIndex + 1] : "week") ?? "week";

const limitIndex = args.indexOf('--limit');

const limit: number = Number(limitIndex!==-1 ? args[limitIndex+1] : 10) || 10;

const validDurations = ['day', 'week', 'month', 'year'];

if(!validDurations.includes(duration)){
    console.error("Invalid duration. choose from: day, week, month, year");
    process.exit(1);
}

if(isNaN(limit) || limit<=0){
    console.error("limit must be a positive number");
    process.exit(1);
}