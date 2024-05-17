const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
export const formatDate = (dateString: Date) => {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
