import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Table Saw",
      price: 45000,
      image: "/products/tablesaw.jpg",
    },
    {
      id: 2,
      name: "Router",
      price: 18000,
      image: "/products/router.jpg",
    },
    {
      id: 3,
      name: "Orbital Sander",
      price: 12000,
      image: "/products/sander.jpg",
    },
    {
      id: 4,
      name: "Drill",
      price: 15000,
      image: "/products/drill.jpg",
    },
    {
      id: 5,
      name: "Chisel Set",
      price: 3500,
      image: "/products/chisel.jpg",
    },
  ];

  res.json(products);
});

export default router;