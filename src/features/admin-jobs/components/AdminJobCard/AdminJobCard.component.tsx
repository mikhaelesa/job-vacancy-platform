import Button from "@/src/components/atoms/Button";

const AdminJobCard = () => {
  return (
    <div className="shadow-modal p-6 rounded-2xl flex flex-col gap-y-3">
      <div className="flex gap-x-4 items-center">
        <div className="rounded-lg px-4 py-1 bg-success-surface border border-success-border">
          <p className="text-success-main font-bold text-m">Active</p>
        </div>
        <div className="py-1 px-4 border border-neutral-40 rounded-sm">
          <p className="text-m text-neutral-90">started on 1 Oct 2025</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-bold">Front End Developer</p>
        <div className="flex items-center justify-between">
          <p className="text-l text-neutral-80">Rp7.000.000 - Rp8.000.000</p>
          <Button size="small">Manage Job</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCard;
