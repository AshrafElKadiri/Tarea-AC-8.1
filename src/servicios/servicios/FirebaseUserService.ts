import { ref, get, update } from "firebase/database";
import { database } from "../../firebase";
import { IUserService } from "../IUserService";

export class FirebaseUserService implements IUserService {

    // Método para obtener todos los usuarios
    async getAllUsers(): Promise<{ [uid: string]: any }> {
        try {
            const snapshot = await get(ref(database, `users`));
            return snapshot.exists() ? snapshot.val() : {};
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users.");
        }
    }

    // Método para actualizar el rol de un usuario
    updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void> {
        return update(ref(database, `users/${uid}`), { role: isAdmin ? "ADMIN" : "USER" });
    }

    // Método para establecer roles de usuario
    setUserRoles(uid: string, data: any): Promise<void> {
        return update(ref(database, `users/${uid}`), data);
    }
}
