import {
  ResultOptions,
  getIntent,
  setResult as setResultBase,
} from "../modules/content-intent";
import {
  cacheDirectory,
  copyAsync,
  getContentUriAsync,
  getInfoAsync,
} from "expo-file-system";
import { useCallback, useState } from "react";

export function useCurrentIntent() {
  const [intent] = useState(getIntent);

  const setResult = useCallback(
    async ({ isOK, action, uris }: ResultOptions) => {
      if (!isOK || !uris?.length) {
        setResultBase({ isOK: false });
        return;
      }
      if (
        !intent?.extras?.["android.intent.extra.EXTRA_ALLOW_MULTIPLE"] &&
        uris.length > 1
      ) {
        console.error("Multiple files are not allowed", { isOK, action, uris });
        setResultBase({ isOK: false });
        return;
      }
      const destFiles = await Promise.all(
        uris.map(async (uri: any) => {
          const destFile = (cacheDirectory ?? "") + new URL(uri).pathname;
          if (!(await getInfoAsync(destFile)).exists) {
            await copyAsync({ from: uri, to: destFile });
          }
          return getContentUriAsync(destFile);
        })
      );
      setResultBase({ isOK, action, uris: destFiles });
    },
    [intent]
  );

  return { intent, setResult };
}
