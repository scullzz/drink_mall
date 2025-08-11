// import { useEffect, useState } from "react";
// import {
//   Typography,
//   Button,
//   Container,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useTelegram } from "../utils/telegramHook";
// const SuccessPayment = () => {
//   const tg = useTelegram();
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPaymentStatus = async () => {
//       try {
//         const auth = tg?.initData;

//         const lastRes = await fetch(
//           "https://api.projectdevdnkchain.ru/payhistory/last",
//           {
//             headers: {
//               accept: "application/json",
//               auth,
//             },
//           }
//         );
//         const lastData = await lastRes.json();
//         const invoiceId = lastData.invoice_id;

//         const checkRes = await fetch(
//           `https://api.projectdevdnkchain.ru/payhistory/check/${invoiceId}`,
//           {
//             headers: {
//               accept: "application/json",
//               auth,
//             },
//           }
//         );
//         const checkData = await checkRes.json();
//         setStatus(checkData.status);
//       } catch (error) {
//         console.error("Ошибка при получении статуса платежа:", error);
//         setStatus("Ошибка");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentStatus();
//   }, []);

//   if (loading) {
//     return (
//       <Container
//         maxWidth="sm"
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to bottom right, #e8f5e9, #ffffff)",
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           padding: 4,
//           borderRadius: 3,
//           textAlign: "center",
//         }}
//       >
//         <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Платёж прошёл успешно!
//         </Typography>
//         <Typography variant="body1" color="text.secondary" mb={3}>
//           Статус: {status}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={() => (window.location.href = "/")}
//         >
//           Вернуться на главную
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default SuccessPayment;
