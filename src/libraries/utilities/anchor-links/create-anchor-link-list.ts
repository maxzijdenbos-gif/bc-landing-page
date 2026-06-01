import { ContentModule } from 'components/utilities/content-modules/content-modules';

function toValidHtmlId(input: string): string {
  if (!input) return 'id';

  // Remove all whitespace
  let id = input.trim().replace(/\s+/g, '_');

  // Replace invalid characters with underscores
  id = id.replace(/[^A-Za-z0-9\-_.]/g, '_');

  // Ensure it doesn't start with a number or invalid character
  if (!/^[A-Za-z_]/.test(id)) {
    id = `id_${id}`;
  }

  return id;
}

export const generateAnchorLinkTarget = (
  index: number,
  title?: string,
): string | undefined => {
  if (!title) return undefined;

  return `${toValidHtmlId(title)}_${index}`;
};

export const getAnchorList = (
  modules: ContentModule[],
):
  | { anchorTarget: string | undefined; anchorTitle: string | undefined }[]
  | undefined => {
  if (!modules) return undefined;

  return modules
    .filter((module) => module.data.anchorTitle)
    .map((module) => ({
      anchorTarget: module.data.anchorTarget,
      anchorTitle: module.data.anchorTitle,
    }));
};
