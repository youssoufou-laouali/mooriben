import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const Editor = dynamic(() => import("./WYSIWYGeditor"), {
  ssr: false,
});
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import dynamic from "next/dynamic";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { tags, url_api } from "../constant";

const ArticleModify = ({ isUpdate = false }: any) => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState([]);
  const [data, setData] = useState({
    image: "",
    pdf: "",
    pdfTitle: "",
    name: "",
    description: "",
    content: "",
    auteur: "",
    date: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: url_api + "/articles",
        data: {
          ...data,
          categories: [...selectedTags]?.map((el: any) => el?.name),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      toast.success("L'article est créé avec succès!");
      console.log(response);

      // router.push("/admin/articles");
    } catch (e) {
      console.error("Erreur lors de la création de  l'article: ", e);
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     const tags = selectedTags?.map((el: any) => el?.id);

  //     const response = await axios.put(
  //       url_api + "articles/" + articleData?._id,
  //       data
  //     );
  //     console.log(response);

  //     toast.success("L'article a été modifié avec succès!");
  //     router.push("/admin/articles");
  //   } catch (e: any) {
  //     console.error(
  //       "Une erreur est survenue lors de la modification d'article",
  //       e?.response
  //     );
  //   }
  // };

  const uploadImageToStore = async (file: any) => {
    if (file) {
      const storageRef = ref(
        storage,
        "articles/images/" + file.name + Math.random() * 10
      );
      const downloadURL = await uploadBytes(storageRef, file).then(
        async (response) => {
          return await getDownloadURL(response.ref).then(
            async (downloadURL) => downloadURL
          );
        }
      );
      setData({
        ...data,
        image: downloadURL,
      });
    }
  };
  const uploadPDFToStore = async (file: any) => {
    if (file) {
      const storageRef = ref(
        storage,
        "articles/pdf/" + file.name + Math.random() * 10
      );
      const downloadURL = await uploadBytes(storageRef, file).then(
        async (response) => {
          return await getDownloadURL(response.ref).then(
            async (downloadURL) => downloadURL
          );
        }
      );
      setData({
        ...data,
        pdf: downloadURL,
      });
    }
  };

  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-full p-10 m-auto max-w-7xl ">
      <button
        className=" float-left drop-shadow-lg px-[11px] py-[11px] rounded-[8px] border border-[rgb(228, 237, 253)] bg-gradient-to-r from-sky-500 to-green-500"
        onClick={() => {
          router.push("/admin/articles");
        }}
      >
        <HomeIcon className="w-4 h-4 text-white" />
      </button>
      <form className="">
        <p className="py-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-900">
          Partager un article
        </p>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-green-800">
            {"* Titre de l'article"}
          </span>
          <input
            type="text"
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            value={data?.name}
            className="block w-full px-4 py-3 mt-1 text-sm font-normal bg-white border border-green-300 rounded-full focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-11"
          />
        </label>

        {/* Switch BUTTON

          <label className="block w-32 mt-4 md:col-span-2">
            <span className="p-1 text-sm font-medium text-green-800">
              * info urgente ?
            </span>
            <div className="pb-4">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? "bg-green-500" : "bg-slate-700"}
                            relative inline-flex h-[30px] w-[62px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="text-black sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-8" : "translate-x-0"}
                              pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </label> */}

        <label className="block pb-8 md:col-span-2">
          <span className="text-sm font-medium text-green-800">* Resumé</span>
          <textarea
            value={data?.description}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
            className="block w-full h-20 p-3 mt-1 text-sm bg-white border rounded-xl border-slate-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          ></textarea>
          <p className="mt-1 text-xs italic text-neutral-500">
            {"Briève description de l'article"}
          </p>
        </label>

        <label className="">
          <span className="text-sm font-medium text-green-800">
            * Choisir les catégories
          </span>

          <Multiselect
            displayValue="name"
            options={tags}
            onSelect={setSelectedTags}
            onRemove={setSelectedTags}
            selectedValues={selectedTags}
          />
        </label>

        <div className="block py-8 md:col-span-2">
          <span className="text-sm font-medium text-green-800">
            {"* L'image de couverture"}
          </span>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md border-neutral-300">
            <div className="space-y-1 text-center">
              {data?.image && data?.image != "" ? (
                <img src={data?.image} alt="" className="h-50" />
              ) : (
                <svg
                  className="w-12 h-12 mx-auto text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              )}
              <div className="flex flex-col text-sm text-gray-800 sm:flex-row">
                <label className="relative font-medium rounded-md cursor-pointer text-green-6000 hover:text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span className="text-green-600">
                    {"Téléchargez l'image de couverture"}
                  </span>
                  <input
                    name="file-upload"
                    onChange={(e: any) =>
                      uploadImageToStore(e?.target?.files[0])
                    }
                    type="file"
                    className="sr-only"
                  />
                </label>
                {/* <p className="pl-1">glisser deposer</p> */}
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF MOINS DE 5MB
              </p>
            </div>
          </div>
        </div>

        <label className="block py-8 md:col-span-2">
          <span className="text-sm font-medium text-green-800 ">
            * Le titre du fichier à joindre
          </span>
          <input
            type="text"
            value={data?.pdfTitle}
            onChange={(e) =>
              setData({
                ...data,
                pdfTitle: e.target.value,
              })
            }
            className="block w-full px-4 py-3 mt-1 text-sm font-normal bg-white border rounded-full border-slate-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-11"
          />
        </label>

        <div className="block py-8 md:col-span-2">
          <span className="text-sm font-medium text-green-800">
            {"* Choisir la fichier à joindre"}
          </span>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md border-neutral-300">
            <div className="space-y-1 text-center">
              {data?.pdf && data?.pdf != "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  className="m-auto"
                  width="57"
                  height="66"
                  viewBox="0 0 575.45508 668.31863"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    d="M887.72754,709.08824H733.27246v-2h.00015A152.45493,152.45493,0,0,0,885.72754,554.63332V446.84068h2Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M466.28967,319.488a114.22783,114.22783,0,0,1-12.55762,3.9713c-5.62552,1.371-8.80168,2.00651-14.2313-.10074-.19073-.074-.37274-.14719-.54445-.21916a57.67862,57.67862,0,0,1-35.10473-52.299c-.02717-.38357-.02717-.78688-.02717-1.18035a56.19182,56.19182,0,0,1,.27141-5.67544,57.37007,57.37007,0,0,1,1.23014-7.63289l-.05427-.00984c-4.396-4.49514-6.08745-10.6526-5.52665-16.83954A27.8324,27.8324,0,0,1,412.31794,218.689a44.03242,44.03242,0,0,1,18.28053-6.45254,46.32618,46.32618,0,0,1,5.25531-.30492h16.49858a71.2821,71.2821,0,0,1,10.35686-1.63284h.02711c33.20525-2.75411,59.39135,19.25926,56.94911,46.04317-.01811.02954-.04521.059-.06332.08855-.70551,1.15082-1.32963,2.24262-1.88144,3.28525-.53364.97377-.9859,1.90822-1.37484,2.7935-3.0302,6.846,11.36992,113.06125,6.205,114.67433-2.93972.91476-14.789-78.123-12.6634-63.09339C512.58492,332.946,481.58713,313.83322,466.28967,319.488Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#2f2e41"
                  />
                  <polygon
                    points="204.039 395.654 250.068 493.714 73.005 475.781 109.966 381.645 204.039 395.654"
                    fill="#ffb6b6"
                  />
                  <path
                    d="M608.71111,708.10068a257.90911,257.90911,0,0,1-95.64,12.81l-14.09-22.85s-.59,8.51-1.47,21.52a248.82112,248.82112,0,0,1-45.47-9.64c-28.11-8.79-54.46-22.41-81.17-34.97-5.41-32.25-7.44-81.98,22.47-110.93l160.99,29.5s25.83,19.32,18.92,26.24c-6.91,6.91-7.98,5.84-3.44,10.38,4.54,4.54,14.35,10.61005,14.45,14.58C584.30107,646.29069,595.31108,674.40067,608.71111,708.10068Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M488.19882,322.00724l-38.89471,2.71358L424.165,349.013l-8.80424,1.57147A32.8246,32.8246,0,0,0,388.35461,384.83c1.811,30.68255,5.86582,76.52768,14.34076,91.40151,13.14119,23.06327,23.99553,15.827,13.14119,23.06327s-18.14163,1.55016-13.14119,12.98621-6.75842,26.10467-6.75842,26.10467l-4.681,4.681,4.96475,2.03476L554.41713,565.686s-13.67875-61.50178-5.1242-76.60989,29.296-60.77675,10.78455-78.6462l-18.0999-63.69413-31.13375-9.18242Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#6c63ff"
                  />
                  <path
                    d="M723.64653,574.42937A17.98107,17.98107,0,0,1,706.56632,553.024L632.35987,502.7684l8.85421-23.94307L728.91379,539.159a17.95587,17.95587,0,0,1-5.26726,35.27033Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#ffb6b6"
                  />
                  <path
                    d="M514.04974,343.72762l-10.783,4.26967,57.52156,112.34356,119.07923,81.16849,17.16487-29.01121-90.64431-78.2945-36.28982-69.59841A44.66534,44.66534,0,0,0,514.04974,343.72762Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#6c63ff"
                  />
                  <circle
                    cx="154.45508"
                    cy="157.23055"
                    r="39.05578"
                    fill="#ffb6b6"
                  />
                  <path
                    d="M500.69035,256.55559c-.65123.34367-1.29347.66029-1.94476.97685-.67839.32562-1.35679.65129-2.04418.9588-13.07045,5.92465-23.71676,6.585-30.17511-1.93565a36.16881,36.16881,0,0,0-2.97587-13.00712,20.90284,20.90284,0,0,1-3.44625,13.00712H447.09706c-13.39606,8.89147-20.27046,17.05939-10.97193,46.24848.606,1.91765,4.75782,70.04666,5.94275,75.28391-20.2795-7.779-37.7731-90.37144-38.21631-112.13438-.02717-.35273-.02717-.72361-.02717-1.08545a47.554,47.554,0,0,1,.27141-5.21909,48.86121,48.86121,0,0,1,1.23014-7.01914l-.05427-.00906a18.33085,18.33085,0,0,1-5.52665-15.48552,44.66352,44.66352,0,0,1,12.4101-11.12568,79.196,79.196,0,0,1,13.586-5.10155c.11759-.02711.21708-.05427.33467-.08138,1.42917-.389,2.8945-.74172,4.35983-1.04928a81.869,81.869,0,0,1,9.14477-1.3839c.22613-.00906.44321-.02717.64223-.02717a6.85291,6.85291,0,0,1,3.49147.9588c.00905,0,.00905.00906.02711.00906a6.89007,6.89007,0,0,1,3.35582,5.86132h14.49056c.53364,0,1.06733.01811,1.601.04522,20.18.805,36.39826,9.43427,37.43844,29.27057C500.67224,255.1988,500.69035,255.86814,500.69035,256.55559Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#2f2e41"
                  />
                  <circle
                    cx="102.74716"
                    cy="116.55484"
                    r="25.73018"
                    fill="#2f2e41"
                  />
                  <path
                    d="M450.34438,220.49454c-2.92316,13.90648-17.34512,22.22375-31.14221,18.82147a25.73019,25.73019,0,0,1-18.82147-31.1422c3.40228-13.79709,20.14678-9.81952,31.1422-18.82148C447.07749,176.61776,454.28651,201.74053,450.34438,220.49454Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M393.17569,607.597c21.92937-89.42732,65.38029-166.29182,137.3408-226.51415a20.24579,20.24579,0,0,1,27.77727-6.80757L729.36225,477.99792a20.24555,20.24555,0,0,1,6.80745,27.77714c-27.4664,91.76223-68.60463,171.3878-137.34068,226.51427a20.24537,20.24537,0,0,1-27.777,6.80761L399.98354,635.37428A20.24591,20.24591,0,0,1,393.17569,607.597Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M423.58155,637.73515a20.24547,20.24547,0,0,1-6.8076-27.777c21.92927-89.42776,65.38032-166.2921,137.34054-226.51446a19.98448,19.98448,0,0,1,7.54552-7.12751l-3.36622-2.04122a20.24619,20.24619,0,0,0-27.77725,6.80728C458.55617,441.30474,415.10528,518.169,393.176,607.59672a20.24539,20.24539,0,0,0,6.80759,27.777L571.05177,739.09662a20.1556,20.1556,0,0,0,20.23173.32023Z"
                    transform="translate(-312.27246 -115.84068)"
                    opacity="0.2"
                    style={{ isolation: "isolate" }}
                  />
                  <path
                    d="M624.201,587.772l-114.829-69.18876a8.04378,8.04378,0,0,1,8.30255-13.77958l114.829,69.18876a8.04378,8.04378,0,0,1-8.30268,13.77942Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#fff"
                  />
                  <path
                    d="M557.40068,496.02091l-25.26225-15.2215a8.04383,8.04383,0,0,1,8.2592-13.80574l.04348.02632,25.26225,15.22151a8.04377,8.04377,0,0,1-8.30268,13.77941Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#fff"
                  />
                  <path
                    d="M605.95064,618.06109l-114.829-69.18876a8.04382,8.04382,0,0,1,8.28623-13.7895l.01632.00992,114.829,69.18876a8.04378,8.04378,0,0,1-8.30268,13.77942Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#fff"
                  />
                  <circle
                    cx="326.51102"
                    cy="307.93473"
                    r="33.53921"
                    fill="#3f3d56"
                  />
                  <circle
                    cx="268.69818"
                    cy="595.63336"
                    r="71.68503"
                    fill="#fff"
                  />
                  <path
                    d="M580.97062,784.15932a72.68506,72.68506,0,1,1,72.68506-72.68555A72.76757,72.76757,0,0,1,580.97062,784.15932Zm0-143.37012a70.68506,70.68506,0,1,0,70.68506,70.68457A70.76475,70.76475,0,0,0,580.97062,640.7892Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#3f3d56"
                  />
                  <path
                    d="M571.19132,748.78276a7.97166,7.97166,0,0,1-6.37854-3.19024L545.256,719.51639a7.97379,7.97379,0,1,1,12.75837-9.56813l12.7947,17.05832,32.86156-49.29169a7.97412,7.97412,0,1,1,13.26974,8.8465L577.82683,745.2317a7.97733,7.97733,0,0,1-6.41357,3.54846C571.33928,748.78146,571.2653,748.78276,571.19132,748.78276Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#6c63ff"
                  />
                  <ellipse
                    cx="812.17178"
                    cy="344.61891"
                    rx="5.17661"
                    ry="3.60114"
                    transform="translate(-338.67921 -45.39552) rotate(-4.88719)"
                    fill="#fff"
                  />
                  <ellipse
                    cx="844.22218"
                    cy="333.74642"
                    rx="5.17661"
                    ry="3.60114"
                    transform="translate(-337.63641 -42.70455) rotate(-4.88719)"
                    fill="#3f3d56"
                  />
                  <ellipse
                    cx="796.9793"
                    cy="320.16645"
                    rx="5.17661"
                    ry="3.60114"
                    transform="translate(-336.65124 -46.77873) rotate(-4.88719)"
                    fill="#ff6584"
                  />
                  <ellipse
                    cx="783.12096"
                    cy="312.68407"
                    rx="2.27591"
                    ry="3.27161"
                    transform="translate(-361.92998 64.44338) rotate(-12.7322)"
                    fill="#e6e6e6"
                  />
                  <ellipse
                    cx="773.54902"
                    cy="293.55567"
                    rx="2.27591"
                    ry="3.27161"
                    transform="translate(-357.94956 61.86343) rotate(-12.7322)"
                    fill="#3f3d56"
                  />
                  <ellipse
                    cx="819.47303"
                    cy="320.41852"
                    rx="2.27591"
                    ry="3.27161"
                    transform="translate(-362.74075 72.64536) rotate(-12.7322)"
                    fill="#e6e6e6"
                  />
                  <ellipse
                    cx="805.47423"
                    cy="332.03974"
                    rx="2.27591"
                    ry="3.27161"
                    transform="translate(-365.64622 69.84586) rotate(-12.7322)"
                    fill="#ff6584"
                  />
                  <ellipse
                    cx="830.95919"
                    cy="341.50532"
                    rx="2.27591"
                    ry="3.27161"
                    transform="translate(-367.10572 75.69535) rotate(-12.7322)"
                    fill="#3f3d56"
                  />
                  <ellipse
                    cx="675.13485"
                    cy="198.762"
                    rx="3.60114"
                    ry="5.17661"
                    transform="translate(4.33932 688.54051) rotate(-75.77932)"
                    fill="#fff"
                  />
                  <ellipse
                    cx="641.29123"
                    cy="198.54384"
                    rx="3.60114"
                    ry="5.17661"
                    transform="translate(-20.9789 655.56939) rotate(-75.77932)"
                    fill="#3f3d56"
                  />
                  <ellipse
                    cx="681.48584"
                    cy="226.84045"
                    rx="3.60114"
                    ry="5.17661"
                    transform="translate(-18.0879 715.87766) rotate(-75.77932)"
                    fill="#ff6584"
                  />
                  <ellipse
                    cx="692.1313"
                    cy="238.44708"
                    rx="3.27161"
                    ry="2.27591"
                    transform="translate(66.02744 783.97815) rotate(-83.62433)"
                    fill="#e6e6e6"
                  />
                  <ellipse
                    cx="694.91422"
                    cy="259.65492"
                    rx="3.27161"
                    ry="2.27591"
                    transform="translate(47.42466 805.59664) rotate(-83.62433)"
                    fill="#3f3d56"
                  />
                  <ellipse
                    cx="660.31394"
                    cy="219.23899"
                    rx="3.27161"
                    ry="2.27591"
                    transform="translate(56.83259 735.28249) rotate(-83.62433)"
                    fill="#e6e6e6"
                  />
                  <ellipse
                    cx="677.34564"
                    cy="212.84054"
                    rx="3.27161"
                    ry="2.27591"
                    transform="translate(78.33185 746.52093) rotate(-83.62433)"
                    fill="#ff6584"
                  />
                  <ellipse
                    cx="656.36333"
                    cy="195.55403"
                    rx="3.27161"
                    ry="2.27591"
                    transform="translate(76.85916 710.30149) rotate(-83.62433)"
                    fill="#3f3d56"
                  />
                  <path
                    d="M314.27246,378.08775h-2V115.84068H466.72754v2h-.00015A152.45493,152.45493,0,0,0,314.27246,270.29561Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M403.84245,608.54427a19.07237,19.07237,0,0,1-9.03526-27.6058l-55.10537-77.46088L357.38,482.96777l64.77681,92.48a19.04564,19.04564,0,0,1-18.31433,33.0965Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#ffb6b6"
                  />
                  <path
                    d="M405.10862,363.0727h0a13.59981,13.59981,0,0,0-17.38172,3.06013L313.27234,470.26162l69,98,27-29-42-66,55.81831-53.1454A44.66534,44.66534,0,0,0,405.10862,363.0727Z"
                    transform="translate(-312.27246 -115.84068)"
                    fill="#6c63ff"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  className="m-auto"
                  width="78"
                  height="70"
                  viewBox="0 0 782.04441 701.88002"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    d="M609.48783,100.59015l-25.44631,6.56209L270.53735,187.9987,245.091,194.56079A48.17927,48.17927,0,0,0,210.508,253.17865L320.849,681.05606a48.17924,48.17924,0,0,0,58.61776,34.58317l.06572-.01695,364.26536-93.93675.06572-.01695a48.17923,48.17923,0,0,0,34.58309-58.6178l-110.341-427.87741A48.17928,48.17928,0,0,0,609.48783,100.59015Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M612.94784,114.00532l-30.13945,7.77236L278.68955,200.20385l-30.139,7.77223a34.30949,34.30949,0,0,0-24.6275,41.74308l110.341,427.87741a34.30946,34.30946,0,0,0,41.7431,24.62736l.06572-.01695,364.26536-93.93674.06619-.01707a34.30935,34.30935,0,0,0,24.627-41.7429l-110.341-427.87741A34.30938,34.30938,0,0,0,612.94784,114.00532Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#fff"
                  />
                  <path
                    d="M590.19,252.56327,405.917,300.08359a8.01411,8.01411,0,0,1-4.00241-15.52046l184.273-47.52033A8.01412,8.01412,0,0,1,590.19,252.56327Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M628.955,270.49906,412.671,326.27437a8.01411,8.01411,0,1,1-4.00241-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M620.45825,369.93676l-184.273,47.52032a8.01411,8.01411,0,1,1-4.00242-15.52046l184.273-47.52032a8.01411,8.01411,0,1,1,4.00241,15.52046Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M659.22329,387.87255l-216.284,55.77531a8.01411,8.01411,0,1,1-4.00242-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M650.72653,487.31025l-184.273,47.52033a8.01412,8.01412,0,0,1-4.00242-15.52047l184.273-47.52032a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M689.49156,505.246l-216.284,55.77532a8.01412,8.01412,0,1,1-4.00241-15.52047l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#f2f2f2"
                  />
                  <path
                    d="M374.45884,348.80871l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76146L289.5963,304.81607a3.847,3.847,0,0,1,2.76145-4.68061l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76145l14.96947,58.04817A3.847,3.847,0,0,1,374.45884,348.80871Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M404.72712,466.1822l-65.21247,16.817a3.847,3.847,0,0,1-4.68062-2.76146l-14.96946-58.04816A3.847,3.847,0,0,1,322.626,417.509l65.21246-16.817a3.847,3.847,0,0,1,4.68062,2.76145l14.96946,58.04817A3.847,3.847,0,0,1,404.72712,466.1822Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M434.99539,583.55569l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76145l-14.96946-58.04817a3.847,3.847,0,0,1,2.76145-4.68062l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76146l14.96947,58.04816A3.847,3.847,0,0,1,434.99539,583.55569Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M863.63647,209.0517H487.31811a48.17928,48.17928,0,0,0-48.125,48.12512V699.05261a48.17924,48.17924,0,0,0,48.125,48.12507H863.63647a48.17924,48.17924,0,0,0,48.125-48.12507V257.17682A48.17928,48.17928,0,0,0,863.63647,209.0517Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M863.637,222.90589H487.31811a34.30948,34.30948,0,0,0-34.271,34.27093V699.05261a34.30947,34.30947,0,0,0,34.271,34.27088H863.637a34.30936,34.30936,0,0,0,34.27051-34.27088V257.17682A34.30937,34.30937,0,0,0,863.637,222.90589Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#fff"
                  />
                  <circle
                    cx="694.19401"
                    cy="614.02963"
                    r="87.85039"
                    fill="#6c63ff"
                  />
                  <path
                    d="M945.18722,701.63087H914.63056V671.07421a11.45875,11.45875,0,0,0-22.9175,0v30.55666H861.1564a11.45875,11.45875,0,0,0,0,22.9175h30.55666V755.105a11.45875,11.45875,0,1,0,22.9175,0V724.54837h30.55666a11.45875,11.45875,0,0,0,0-22.9175Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#fff"
                  />
                  <path
                    d="M807.00068,465.71551H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01412,8.01412,0,0,1,0,16.02823Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M840.05889,492.76314H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01411,8.01411,0,1,1,0,16.02823Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M807.00068,586.929H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01411,8.01411,0,0,1,0,16.02823Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M840.05889,613.97661H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01412,8.01412,0,1,1,0,16.02823Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M574.07028,505.04162H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V441.25158a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,505.04162Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M574.07028,626.25509H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V562.46505a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,626.25509Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#e6e6e6"
                  />
                  <path
                    d="M807.21185,330.781H666.91017a8.01411,8.01411,0,0,1,0-16.02823H807.21185a8.01411,8.01411,0,0,1,0,16.02823Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#ccc"
                  />
                  <path
                    d="M840.27007,357.82862H666.91017a8.01411,8.01411,0,1,1,0-16.02822h173.3599a8.01411,8.01411,0,0,1,0,16.02822Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#ccc"
                  />
                  <path
                    d="M635.85911,390.6071H506.51316a3.847,3.847,0,0,1-3.84277-3.84277V285.81706a3.847,3.847,0,0,1,3.84277-3.84277H635.85911a3.847,3.847,0,0,1,3.84277,3.84277V386.76433A3.847,3.847,0,0,1,635.85911,390.6071Z"
                    transform="translate(-208.9778 -99.05999)"
                    fill="#6c63ff"
                  />
                </svg>
              )}
              <div className="flex flex-col text-sm text-gray-800 sm:flex-row">
                <label className="relative font-medium rounded-md cursor-pointer text-green-6000 hover:text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span className="text-green-600">
                    {"Charger le document couplé"}
                  </span>
                  <input
                    name="file-upload"
                    onChange={(e: any) => uploadPDFToStore(e?.target?.files[0])}
                    type="file"
                    className="sr-only"
                  />
                </label>
                {/* <p className="pl-1">glisser deposer</p> */}
              </div>
              <p className="text-xs text-neutral-500">PDF, WORD, TEXT</p>
            </div>
          </div>
        </div>

        <label>
          <span className="text-sm font-medium text-green-800">
            {"* Corps de l'article"}
          </span>
          <Editor
            onChagedValue={(value: string) =>
              setData({
                ...data,
                content: value,
              })
            }
            value={data?.content}
            label=""
          />
        </label>

        <label className="block py-8 md:col-span-2">
          <span className="text-sm font-medium text-green-800 ">* Auteur</span>
          <input
            type="text"
            value={data?.auteur}
            onChange={(e) =>
              setData({
                ...data,
                auteur: e.target.value,
              })
            }
            className="block w-full px-4 py-3 mt-1 text-sm font-normal bg-white border rounded-full border-slate-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-11"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-green-800">* Date</span>
          <input
            type="date"
            value={data?.date}
            onChange={(e) =>
              setData({
                ...data,
                date: e.target.value,
              })
            }
            className="block w-full px-4 py-3 mt-1 text-sm font-normal bg-white border rounded-full border-slate-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-11"
          />
        </label>

        <div className="pt-6 my-5">
          {isUpdate ? (
            <button
              // onClick={() => handleUpdate()}
              type="button"
              className="focus:outline-none block  w-full md:w-auto mb-4  md:mx-auto text-white text-sm py-2.5 px-5 rounded-md bg-gradient-to-r from-cyan-500 to-green-500 transform  active:scale-[1.08]"
            >
              Modifier
            </button>
          ) : (
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="focus:outline-none block  w-full md:w-auto mb-4  md:mx-auto text-white text-sm py-2.5 px-5 rounded-md bg-gradient-to-r from-green-400 to-green-600 transform  active:scale-[1.08]"
            >
              Enrégistrer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ArticleModify;
