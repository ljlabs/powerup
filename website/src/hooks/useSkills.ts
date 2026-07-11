import { useState, useEffect } from "react";
import type { SkillMeta } from "../types";

export function useSkills() {
  const [skills, setSkills] = useState<SkillMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("skills-manifest.json")
      .then((r) => r.json())
      .then((data: SkillMeta[]) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { skills, loading };
}
