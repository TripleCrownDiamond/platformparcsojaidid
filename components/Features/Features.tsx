import {
  UserPlusIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { getFeaturesHeaderDatas, getFeaturesStepsDatas } from "@/app/api/getFeaturesDatas";

// Définir des interfaces pour typer les données
interface StepData {
  title: string;
  description: string;
  icon: keyof typeof iconMap; // Le nom de l'icône doit correspondre à une clé dans iconMap
}

interface HeaderData {
  title: string;
  subtitle_1: string;
  subtitle_2: string;
}

const iconMap = {
  UserPlusIcon: UserPlusIcon,
  BookOpenIcon: BookOpenIcon,
  AcademicCapIcon: AcademicCapIcon,
  ClipboardDocumentIcon: ClipboardDocumentIcon,
};

export default async function Features() {
  const { loading, data } = await getFeaturesHeaderDatas(
    "/api/features-header?populate=*"
  );

  const { stepLoading, stepData } = await getFeaturesStepsDatas(
    "/api/features-steps?populate=*"
  );

  // Texte par défaut si les données ne sont pas récupérées
  const defaultHeaderData: HeaderData = {
    title: "Accédez aux meilleurs outils éducatifs pour la filière Soja",
    subtitle_1: "Découvrez notre plateforme.",
    subtitle_2:
      "Notre plateforme vous offre des ressources éducatives complètes pour réussir dans la culture du soja, avec des outils de formation et des documents pratiques à portée de main.",
  };

  const defaultStepData: StepData[] = [
    {
      title: "Création de compte",
      description:
        "Inscrivez-vous pour accéder à des ressources exclusives dédiées à la filière soja. Créez votre compte en quelques clics et commencez à apprendre dès aujourd'hui.",
      icon: "UserPlusIcon",
    },
    {
      title: "Accès aux ressources éducatives",
      description:
        "Accédez à une large gamme de ressources pédagogiques, notamment des guides, des tutoriels, et des formations sur les meilleures pratiques de culture du soja.",
      icon: "BookOpenIcon",
    },
    {
      title: "Formations spécialisées",
      description:
        "Bénéficiez de formations spécialisées pour perfectionner vos compétences et améliorer vos connaissances sur la filière soja. Que vous soyez débutant ou expert, nous avons des cours adaptés à tous les niveaux.",
      icon: "AcademicCapIcon",
    },
    {
      title: "Téléchargement de documents pratiques",
      description:
        "Téléchargez des documents essentiels et des fiches techniques pour vous accompagner dans vos projets agricoles. Simplifiez l'accès aux informations dont vous avez besoin pour réussir.",
      icon: "ClipboardDocumentIcon",
    },
  ];

  // Si les données ne sont pas chargées ou sont manquantes, utiliser les valeurs par défaut
  const headerData: HeaderData = data || defaultHeaderData;
  const steps: StepData[] = stepData || defaultStepData;

  const { title, subtitle_1, subtitle_2 } = headerData;

  return (
    <div className="bg-white py-20 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-900">
            {subtitle_1}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
            {title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {subtitle_2}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {steps.map((step: StepData, index: number) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={index} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-900">
                      {IconComponent && (
                        <IconComponent
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        />
                      )}
                    </div>
                    {step.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
