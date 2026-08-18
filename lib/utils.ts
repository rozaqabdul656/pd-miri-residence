export const formatDate=(date:string)=>new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"long",year:"numeric"}).format(new Date(`${date}T00:00:00`));
