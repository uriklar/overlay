import { mountContentScript } from './content';
import { fetchPackageInfo } from './content-events';
import { findRanges } from './stackoverflow/finder';
import { addIndicator } from './stackoverflow/indicator';

mountContentScript(async () => {
  const findings = findRanges(document.body);
  console.debug({ findings });

  let processed = {};
  findings.forEach(({ range, ...packageId }) => {
    addIndicator(range, packageId);
    let packageKey = `${packageId.type}/${packageId.name}`;
    if (processed[packageKey]) {
      return;
    }

    processed[packageKey] = true;
    fetchPackageInfo(packageId);
  });
});
