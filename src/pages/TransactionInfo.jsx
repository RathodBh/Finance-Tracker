import React from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "./Add";
//mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ShowInfo = () => {
  // const location = useLocation();
  const {id} = useParams();
  console.log("🚀 ~ file: ShowInfo.jsx:15 ~ ShowInfo ~ id:", id)

  const allData = getData();
  const [cardData] = allData.filter((data) => parseInt(data.id) === parseInt(id));
  console.log("🚀 ~ file: ShowInfo.jsx:18 ~ ShowInfo ~ cardData:", cardData);

  return (
    <>
      <Link to="/">
        <ArrowBackIcon></ArrowBackIcon>
      </Link>

      <div className="allCenter">
        <Card sx={{ maxWidth: 345 }}>
          {cardData?.receipt && (
            <CardMedia
              sx={{ height: 240 }}
              image={cardData.receipt}
              title="green iguana"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              Amount: {cardData.amount}
            </Typography>
            <br />
            <Typography gutterBottom variant="h5" component="div">
              Transaction Date: <br />
              {cardData.transDate} ({cardData.monthYear})
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Type of transaction: <br />
              <b>{cardData.transactionType}</b>
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Notes: <br />
              <b>{cardData.notes}</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{cardData.fromAccount}</Button>
            <Button size="small">&#8594;</Button>
            <Button size="small">{cardData.toAccount}</Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default ShowInfo;
