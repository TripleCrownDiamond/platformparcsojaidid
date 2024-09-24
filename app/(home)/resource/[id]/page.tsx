import React from 'react';
import ResourceDetails from '@/components/ResourceDetails/ResourceDetails';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("fr");

// Le type pour les paramètres doit correspondre à l'objet params
interface Params {
  params: {
    id: string;
  };
}

const Page = ({ params }: Params) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <ResourceDetails resourceId={params.id} />
    </div>
  );
};

export default Page;
