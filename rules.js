
export function validateCreature(data) {

    const errors = {};

    if (!data.name || !data.name.trim()) {
        errors.name = "Le nom est obligatoire.";
    }

    if (!data.type) {
        errors.type = "Choisissez un type.";
    }

    if (!data.stats) {
        errors.stats = "Les statistiques sont obligatoires.";
    } else {
        for (const stat of ["hp", "attack", "defence"]) {
            const value = Number(data.stats[stat]);

            if (!Number.isInteger(value) || value < 1 || value > 255) {
                errors[stat] = "La valeur doit être entre 1 et 255.";
            }
        }
    }

    return errors;
}
