import ecofillBeiji from "../../assets/images/stations/ecofill-beiji.jpg";
import refillMargonda from "../../assets/images/stations/refill-margonda.jpg";
import isiUlangKemang from "../../assets/images/stations/isi-ulang-kemang.jpg";
import greenRefillMenteng from "../../assets/images/stations/green-refill-menteng.jpg";
import ecofillSuryakancana from "../../assets/images/stations/ecofill-suryakancana.jpg";
import refillPakHerman from "../../assets/images/stations/refill-pak-herman.jpg";
import isiUlangBsd from "../../assets/images/stations/isi-ulang-bsd.jpg";
import ecofillAlamSutera from "../../assets/images/stations/ecofill-alam-sutera.jpg";
import refillHijauBekasi from "../../assets/images/stations/refill-hijau-bekasi.jpg";

export const stations = [
  {
    id: "stn-01",
    name: "EcoFill Beiji",
    address: "Beiji No. 9, Depok",
    city: "Depok",
    tags: ["Shampoo", "Detergent"],
    lat: -6.4025,
    lng: 106.7942,
    image: ecofillBeiji,
  },
  {
    id: "stn-02",
    name: "Refill Hijau Margonda",
    address: "Jl. Margonda Raya No. 45, Depok",
    city: "Depok",
    tags: ["Soap", "Softener"],
    lat: -6.3728,
    lng: 106.8317,
    image: refillMargonda,
  },
  {
    id: "stn-03",
    name: "Isi Ulang Kemang",
    address: "Jl. Kemang Raya No. 21, Jakarta Selatan",
    city: "Jakarta",
    tags: ["Shampoo", "Soap"],
    lat: -6.2607,
    lng: 106.8133,
    image: isiUlangKemang,
  },
  {
    id: "stn-04",
    name: "Green Refill Menteng",
    address: "Jl. Menteng Raya No. 5, Jakarta Pusat",
    city: "Jakarta",
    tags: ["Detergent", "Softener"],
    lat: -6.1966,
    lng: 106.8353,
    image: greenRefillMenteng,
  },
  {
    id: "stn-05",
    name: "EcoFill Suryakancana",
    address: "Jl. Suryakancana No. 15, Bogor",
    city: "Bogor",
    tags: ["Soap", "Detergent"],
    lat: -6.5971,
    lng: 106.7912,
    image: ecofillSuryakancana,
  },
  {
    id: "stn-06",
    name: "Refill Pak Herman",
    address: "Jl. Pajajaran No. 33, Bogor",
    city: "Bogor",
    tags: ["Shampoo", "Softener"],
    lat: -6.5747,
    lng: 106.7998,
    image: refillPakHerman,
  },
  {
    id: "stn-07",
    name: "Isi Ulang BSD",
    address: "Jl. BSD Raya Utama, Tangerang Selatan",
    city: "Tangerang",
    tags: ["Shampoo", "Soap"],
    lat: -6.3019,
    lng: 106.6524,
    image: isiUlangBsd,
  },
  {
    id: "stn-08",
    name: "EcoFill Alam Sutera",
    address: "Jl. Alam Sutera Boulevard, Tangerang",
    city: "Tangerang",
    tags: ["Detergent", "Softener"],
    lat: -6.2224,
    lng: 106.6469,
    image: ecofillAlamSutera,
  },
  {
    id: "stn-09",
    name: "Refill Hijau Bekasi",
    address: "Jl. Ahmad Yani No. 88, Bekasi",
    city: "Bekasi",
    tags: ["Soap", "Shampoo"],
    lat: -6.2383,
    lng: 106.9756,
    image: refillHijauBekasi,
  },
];

export const cities = ["Depok", "Jakarta", "Bogor", "Tangerang", "Bekasi"];