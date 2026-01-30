// the main brain for creating the build plan
  
import { ComposeInput } from "./input-validation";
import { ComposeResponse } from "./type";
import { getFeatureByKey, getFrameworkByKey, isFeatureCompatibleWithFramework } from "./repository";
  
  export async function composeService(
    input: ComposeInput
  ): Promise<ComposeResponse> {
    // 1️⃣ Validate framework
    const framework = await getFrameworkByKey(input.framework);
  
    if (!framework.success) {
      throw new Error(`Error: ${framework.mssg}`);
    }

    const repos: ComposeResponse["repos"] = [];
  
    let order = 1;
  
    // 2️⃣ Framework step (always first)
    repos.push({
      type: "framework",
      key: framework.data.uniqueKey,
      repoName: framework.data.repoName,
      order: order++,
    });
  
    // 3️⃣ Authentication (optional)
    if ( input.setupUpto && input.authLib&& input.setupUpto !== "framework") {
      const authFeature = await getFeatureByKey(input.authLib);
  
      if (!authFeature.success) {
        throw new Error(`Error: ${authFeature.mssg}`);
      }
  
      const compatible = await isFeatureCompatibleWithFramework(
        framework.data.id,
        authFeature.data.id
      );
  
      if (!compatible) {
        throw new Error(
          `Auth provider ${input.authLib} is not compatible with ${framework.data.uniqueKey}`
        );
      }
  
      repos.push({
        type: "authentication",
        key: authFeature.data.uniqueKey,
        repoName: authFeature.data.repoName,
        order: order++,
        meta: {
          methods: input.authMethods,
          socialProviders: input.socialProviders,
        },
      });
    }
  
    // 4️⃣ Database (optional)
    if (input.orm) {
      const dbFeature = await getFeatureByKey(input.orm);
  
      if (!dbFeature.success) {
        throw new Error(`Error: ${dbFeature.mssg}`);
      }
  
      const compatible = await isFeatureCompatibleWithFramework(
        framework.data.id,
        dbFeature.data.id
      );
  
      if (!compatible) {
        throw new Error(
          `ORM ${input.orm} is not compatible with ${framework.data.uniqueKey}`
        );
      }
  
      repos.push({
        type: "database",
        key: dbFeature.data.uniqueKey,
        repoName: dbFeature.data.repoName,
        order: order++,
        meta: {
          dbType: input.dbType,
        },
      });
    }
  
    // 5️⃣ Final response
    return {
      framework: {
        key: framework.data.uniqueKey,
        repoName: framework.data.repoName,
      },
      repos,
    };
  }
  