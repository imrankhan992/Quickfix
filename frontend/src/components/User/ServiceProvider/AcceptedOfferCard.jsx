import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  
  export function AcceptOfferCard({ order }) {
       // formate date
    const formateDate = (date) => {
      //  I WANT TO GET live counter that how many time remaining in order expire
      const newDate = new Date(date);
      return newDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    };
    console.log(order);
    return (
      <Card className="w-full max-w-[30rem] p-0  flex-row border-2 border-hoverblack select-none">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none flex "
        >
          <img
            src={
              order?.order?.serviceId?.picture?.url ||
              "/assets/img/default-avatar.png"
            }
            alt="card-image"
            className=" object-cover "
          />
        </CardHeader>
        <CardBody className="px-4 py-2 flex flex-col gap-2 ">
          <div>
          <Typography variant="h5"  className="mb-2 arimo font-bold text-hoverblack">
            {order?.order?.serviceId?.title}
          </Typography>
          <Typography color="gray" className="mb-2 font-normal">
            {order?.order?.serviceId?.description}
          </Typography>
          </div>
          <hr className="border-1" />
          <div className="flex justify-between ">
            <Typography
              variant="h6"
              color="gray"
              className="  arimo text-hoverblack"
            >
              Service Provider:
            </Typography>
            <Typography
              variant="h6"
              color="gray"
              className="  arimo "
            >
              {order?.serviceProvider?.firstname}{" "}
              {order?.serviceProvider?.lastname}
            </Typography>
          </div>
         
         <div className="flex flex-col ">
         <Typography
              variant="h6"
              color="gray"
              className="  arimo text-hoverblack"
            >
         Appointment Date:
            </Typography>
         <Typography
              variant="h6"
              color="gray"
              className="  arimo "
            >
           {   formateDate(order?.order?.dateandtime)}
            </Typography>
         </div>
          <Link to={`/serviceprovider/dashboard/accepted-orders/${order?._id}`} className="inline-block  ">
            <Button
              variant="text"
              className="flex items-center gap-2 arimo text-xl text-hoverblack bg-buttoncolor rounded-full "
            >
              Check Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  }
  