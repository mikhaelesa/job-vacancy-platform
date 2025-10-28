"use client";

import Button from "@/src/components/atoms/Button";
import Navbar from "@/src/components/molecules/Navbar";
import Table from "@/src/components/molecules/Table";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import clsx from "clsx";
import NoApplicantsError from "../components/NoApplicantsError";
import useManageJobManager from "../hooks/useManageJobManager.hook";

const testData = [
  {
    id: "1",
    gender: "male",
    full_name: "John Doe",
    date_of_birth: "1990-05-12",
    email: "john.doe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    phone_code_id: 1,
    phone_number: "81234567890",
    province: { id: 11, name: "Aceh" },
  },
  {
    id: "2",
    gender: "female",
    full_name: "Jane Smith",
    date_of_birth: "1993-02-20",
    email: "jane.smith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    phone_code_id: 62,
    phone_number: "81398765432",
    province: { id: 31, name: "DKI Jakarta" },
  },
  {
    id: "3",
    gender: "male",
    full_name: "Michael Tan",
    date_of_birth: "1988-09-15",
    email: "michael.tan@example.com",
    linkedin: "https://linkedin.com/in/michaeltan",
    phone_code_id: 65,
    phone_number: "81455667788",
    province: { id: 35, name: "Jawa Timur" },
  },
  {
    id: "4",
    gender: "female",
    full_name: "Lisa Hartono",
    date_of_birth: "1995-11-25",
    email: "lisa.hartono@example.com",
    linkedin: "https://linkedin.com/in/lisahartono",
    phone_code_id: 62,
    phone_number: "81299887766",
    province: { id: 32, name: "Jawa Barat" },
  },
  {
    id: "5",
    gender: "male",
    full_name: "Andi Prasetyo",
    date_of_birth: "1992-07-03",
    email: "andi.prasetyo@example.com",
    linkedin: "https://linkedin.com/in/andiprasetyo",
    phone_code_id: 62,
    phone_number: "81511223344",
    province: { id: 33, name: "Jawa Tengah" },
  },
  {
    id: "6",
    gender: "female",
    full_name: "Maria Sari",
    date_of_birth: "1994-01-14",
    email: "maria.sari@example.com",
    linkedin: "https://linkedin.com/in/mariasari",
    phone_code_id: 62,
    phone_number: "81633445566",
    province: { id: 34, name: "DI Yogyakarta" },
  },
  {
    id: "7",
    gender: "male",
    full_name: "Steven Wijaya",
    date_of_birth: "1989-03-09",
    email: "steven.wijaya@example.com",
    linkedin: "https://linkedin.com/in/stevenwijaya",
    phone_code_id: 65,
    phone_number: "81722334455",
    province: { id: 17, name: "Kalimantan Barat" },
  },
  {
    id: "8",
    gender: "female",
    full_name: "Nadia Putri",
    date_of_birth: "1997-10-30",
    email: "nadia.putri@example.com",
    linkedin: "https://linkedin.com/in/nadiaputri",
    phone_code_id: 62,
    phone_number: "81866778899",
    province: { id: 36, name: "Banten" },
  },
  {
    id: "9",
    gender: "male",
    full_name: "Rizky Hidayat",
    date_of_birth: "1991-06-18",
    email: "rizky.hidayat@example.com",
    linkedin: "https://linkedin.com/in/rizkyhidayat",
    phone_code_id: 62,
    phone_number: "81999887766",
    province: { id: 73, name: "Sulawesi Selatan" },
  },
  {
    id: "10",
    gender: "female",
    full_name: "Clara Kusuma",
    date_of_birth: "1996-12-05",
    email: "clara.kusuma@example.com",
    linkedin: "https://linkedin.com/in/clarakusuma",
    phone_code_id: 62,
    phone_number: "81122334455",
    province: { id: 51, name: "Bali" },
  },
  {
    id: "11",
    gender: "male",
    full_name: "Aditya Nugraha",
    date_of_birth: "1990-08-21",
    email: "aditya.nugraha@example.com",
    linkedin: "https://linkedin.com/in/adityanugraha",
    phone_code_id: 62,
    phone_number: "81255667788",
    province: { id: 64, name: "Kalimantan Timur" },
  },
  {
    id: "12",
    gender: "female",
    full_name: "Sinta Dewi",
    date_of_birth: "1993-04-11",
    email: "sinta.dewi@example.com",
    linkedin: "https://linkedin.com/in/sintadewi",
    phone_code_id: 62,
    phone_number: "81344556677",
    province: { id: 18, name: "Lampung" },
  },
  {
    id: "13",
    gender: "male",
    full_name: "Kevin Santoso",
    date_of_birth: "1992-01-17",
    email: "kevin.santoso@example.com",
    linkedin: "https://linkedin.com/in/kevinsantoso",
    phone_code_id: 62,
    phone_number: "81499887766",
    province: { id: 61, name: "Kalimantan Barat" },
  },
  {
    id: "14",
    gender: "female",
    full_name: "Rani Lestari",
    date_of_birth: "1995-09-27",
    email: "rani.lestari@example.com",
    linkedin: "https://linkedin.com/in/ranilestari",
    phone_code_id: 62,
    phone_number: "81511224455",
    province: { id: 75, name: "Gorontalo" },
  },
  {
    id: "15",
    gender: "male",
    full_name: "Budi Setiawan",
    date_of_birth: "1988-03-04",
    email: "budi.setiawan@example.com",
    linkedin: "https://linkedin.com/in/budisetiawan",
    phone_code_id: 62,
    phone_number: "81633446677",
    province: { id: 14, name: "Kalimantan Tengah" },
  },
  {
    id: "16",
    gender: "female",
    full_name: "Tania Rahma",
    date_of_birth: "1996-06-19",
    email: "tania.rahma@example.com",
    linkedin: "https://linkedin.com/in/taniarahma",
    phone_code_id: 62,
    phone_number: "81777889900",
    province: { id: 13, name: "Kalimantan Selatan" },
  },
  {
    id: "17",
    gender: "male",
    full_name: "Rafael Gunawan",
    date_of_birth: "1991-12-01",
    email: "rafael.gunawan@example.com",
    linkedin: "https://linkedin.com/in/rafaelgunawan",
    phone_code_id: 62,
    phone_number: "81822334455",
    province: { id: 94, name: "Papua" },
  },
  {
    id: "18",
    gender: "female",
    full_name: "Desi Anggraini",
    date_of_birth: "1994-07-08",
    email: "desi.anggraini@example.com",
    linkedin: "https://linkedin.com/in/desianggraini",
    phone_code_id: 62,
    phone_number: "81966778899",
    province: { id: 76, name: "Sulawesi Barat" },
  },
  {
    id: "19",
    gender: "male",
    full_name: "Fajar Ramadhan",
    date_of_birth: "1993-05-05",
    email: "fajar.ramadhan@example.com",
    linkedin: "https://linkedin.com/in/fajarramadhan",
    phone_code_id: 62,
    phone_number: "81199887766",
    province: { id: 81, name: "Maluku" },
  },
  {
    id: "20",
    gender: "female",
    full_name: "Cindy Halim",
    date_of_birth: "1997-11-10",
    email: "cindy.halim@example.com",
    linkedin: "https://linkedin.com/in/cindyhalim",
    phone_code_id: 62,
    phone_number: "81233445566",
    province: { id: 82, name: "Maluku Utara" },
  },
];

const ManageJob = () => {
  const manager = useManageJobManager();

  return (
    <>
      <Navbar />
      <LoadingBoundary isLoading={manager.isLoading}>
        <ErrorBoundary
          isError={manager.isNoApplicants}
          errorComponent={<NoApplicantsError />}
        >
          <main className="p-6 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <p className="text-xl font-bold">{manager.job?.name}</p>
              <Button
                disabled={manager.isUpdatingJobStatus}
                onClick={manager.getUpdateJobStatusHandler}
                className={clsx(
                  "w-fit",
                  manager.isJobActive && "bg-danger-main!"
                )}
              >
                {manager.isJobActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
            <div className="rounded-lg bg-neutral-10 border border-neutral-40 relative">
              <Table columns={manager.columns} data={manager.jobApplicants!} />
            </div>
          </main>
        </ErrorBoundary>
      </LoadingBoundary>
    </>
  );
};

export default ManageJob;
