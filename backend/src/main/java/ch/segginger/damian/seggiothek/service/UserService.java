package ch.segginger.damian.seggiothek.service;

import ch.segginger.damian.seggiothek.model.User;
import ch.segginger.damian.seggiothek.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Sucht User nach keycloakId, erstellt ihn wenn nicht vorhanden
     */
    public User findOrCreateUser(String keycloakId, String name, String username) {
        Optional<User> existingUser = userRepository.findByKeycloakId(keycloakId);

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        User newUser = new User();
        newUser.setKeycloakId(keycloakId);
        newUser.setName(name);
        newUser.setUsername(username);

        return userRepository.save(newUser);
    }

    public Optional<User> findByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}